#!/usr/bin/env node
// Relay between an MCP client (stdio, one JSON-RPC message per line) and the local MCP server
// of One Shop Manager (HTTP on 127.0.0.1). No dependencies.
// Raw HTTP/1.1 over a socket, like the bridge built into the app: some security software on the
// computer rewrites local replies with a broken "chunked" encoding that HTTP clients reject.
"use strict";
const net = require("node:net");
const readline = require("node:readline");

const key = process.env.OSM_ACCESS_KEY || "";
const port = Number(process.env.OSM_PORT) || 47715;
const where = `http://127.0.0.1:${port}/mcp`;
const HINT =
  "Open One Shop Manager and check Settings › AI settings › AI access (MCP): access enabled, same access key and port.";

function post(body) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const sock = net.connect(port, "127.0.0.1", () => {
      // write, not end: a half-closed socket makes the server drop the reply.
      sock.write(
        `POST /mcp HTTP/1.1\r\nHost: 127.0.0.1:${port}\r\nAuthorization: Bearer ${key}\r\n` +
          `Content-Type: application/json\r\nAccept: application/json, text/event-stream\r\n` +
          `Content-Length: ${Buffer.byteLength(body)}\r\nConnection: close\r\n\r\n${body}`,
      );
    });
    sock.on("data", (c) => chunks.push(c));
    sock.on("error", reject);
    sock.on("close", () => resolve(parse(Buffer.concat(chunks))));
  });
}

/** Status and body of a raw HTTP reply; "chunked" undone when valid, body taken as is otherwise. */
function parse(raw) {
  const split = raw.indexOf("\r\n\r\n");
  if (split < 0) return { status: 0, body: raw.toString() };
  const head = raw.subarray(0, split).toString().toLowerCase();
  let body = raw.subarray(split + 4);
  if (head.includes("transfer-encoding: chunked")) body = dechunk(body) ?? body;
  return { status: Number(head.split(/\s+/)[1]) || 0, body: body.toString() };
}

function dechunk(raw) {
  const out = [];
  for (let at = 0; ; ) {
    const eol = raw.indexOf("\r\n", at);
    if (eol < 0) return null;
    const size = parseInt(raw.subarray(at, eol).toString().split(";")[0], 16);
    if (Number.isNaN(size)) return null;
    if (size === 0) return Buffer.concat(out);
    if (eol + 2 + size > raw.length) return null;
    out.push(raw.subarray(eol + 2, eol + 2 + size));
    at = eol + 2 + size + 2;
  }
}

const fail = (id, message) => {
  console.error(`one-shop-manager: ${message}`);
  if (id !== undefined && id !== null)
    process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, error: { code: -32000, message } }) + "\n");
};

async function relay(line) {
  let id;
  try {
    id = JSON.parse(line).id;
  } catch {
    return fail(null, "unreadable JSON message");
  }
  let res;
  try {
    res = await post(line);
  } catch (e) {
    return fail(id, `One Shop Manager does not answer on ${where} (${e.code || e.message}). ${HINT}`);
  }
  const text = res.body.trim();
  if (res.status === 202 || (res.status === 200 && !text)) return; // notification
  if (res.status !== 200) return fail(id, `One Shop Manager refused the request (${res.status} ${text}). ${HINT}`);
  process.stdout.write(text + "\n");
}

// Replies keep the order of requests.
let queue = Promise.resolve();
readline.createInterface({ input: process.stdin }).on("line", (line) => {
  if (line.trim()) queue = queue.then(() => relay(line));
});
