# One Shop Manager — serveur MCP pour PrestaShop 1.6 à 9

One Shop Manager permet à Claude, ou à tout autre client MCP, de lire une boutique PrestaShop et de préparer des modifications que le marchand relit et valide avant tout envoi à la boutique.

[English](README.md) · [Site](https://oneshopmanager.com/) · [Brancher Claude à PrestaShop](https://oneshopmanager.com/claude-prestashop)

## Ce que c'est

One Shop Manager est un logiciel de bureau pour macOS 11+ et Windows 10+. Il copie la boutique sur l'ordinateur et l'expose aux clients MCP par un **serveur MCP local**. Un petit module PrestaShop fait le pont avec le webservice de la boutique.

- Nom du serveur : `one-shop-manager`
- Transport : Streamable HTTP sur `http://127.0.0.1:47715/mcp` (port modifiable), ou stdio par l'exécutable de l'application (`--mcp <ACCESS_KEY>`)
- Authentification : une clé d'accès (bearer) générée par l'application
- Périmètre : la boutique ouverte dans l'application

Ce dépôt ne contient que de la documentation. Le logiciel One Shop Manager est commercial et n'est pas open source.

## Ce que l'IA peut lire

Les réponses viennent de la copie locale de la boutique, sans requête sur le site en ligne à chaque question.

- **Catalogue** : produits, textes dans chaque langue, catégories, attributs et déclinaisons
- **Commandes** : liste et détail des commandes avec la marge brute
- **Analyse** : rapport des ventes, ventes par produit et invendus, valorisation du stock, réassort, audit SEO, tableaux enregistrés
- **Comptabilité** : synthèse d'une période avec la TVA par pays et par taux, factures et avoirs à vérifier, écritures d'une commande
- **Journal** : opérations passées et statut des propositions de l'IA

## Ce que l'IA peut proposer

- Prix, valeurs de champs et cellules, textes et SEO, catégories et leurs textes
- Création et duplication de produits (créés désactivés)
- Attributs, valeurs d'attribut et déclinaisons, stock des déclinaisons
- Statut des commandes et numéros de suivi
- Annulation d'une opération passée

La liste complète, outil par outil, est dans [docs/tools.md](docs/tools.md).

## Le principe de validation

Rien n'est écrit sur la boutique tant que l'utilisateur n'a pas ouvert l'aperçu avant/après et cliqué sur Appliquer. Chaque outil `propose_*` calcule le changement et le dépose comme proposition dans **Assistant IA › Journal IA** ; l'IA n'a aucun outil qui écrit sur la boutique. Tout s'annule depuis le journal.

Le mode **lecture seule** masque à l'IA tous les outils de proposition.

## Démarrage rapide

1. Téléchargez l'essai gratuit de 14 jours sur [oneshopmanager.com](https://oneshopmanager.com/) et connectez votre boutique.
2. Dans l'application : **Configuration › Configuration IA**, carte **Accès IA (MCP)** : cochez **Activer l'accès IA**, puis cliquez sur **Tester l'accès**.
3. Branchez votre client :
   - [Claude Desktop](docs/clients/claude-desktop.md) : un bouton, **Brancher Claude Desktop**
   - [Claude Code](docs/clients/claude-code.md) : une commande à coller
   - [Cursor](docs/clients/cursor.md)
   - [Autres clients MCP](docs/clients/other-clients.md), dont Codex
4. Demandez : « Combien de produits actifs a ma boutique ? ». L'application doit rester ouverte sur cette boutique.

## Exemples de demandes

- « Quels produits en stock ne se sont pas vendus depuis 90 jours ? »
- « Propose une baisse de 15 % sur ces produits, arrondie à x,90. »
- « Écris une meta description pour les produits de la catégorie Chaussures qui n'en ont pas. »
- « Quelles commandes payées ne sont pas encore expédiées ? »
- « Pourquoi la commande XKBKNABJK est-elle déséquilibrée en comptabilité ? »

D'autres dans [examples/prompts.md](examples/prompts.md).

## Sécurité

- Accès IA désactivé par défaut.
- Connexion MCP locale à l'ordinateur, protégée par une clé d'accès.
- Identifiants de la boutique dans le trousseau du système, hors de portée de l'IA.
- Seules les données nécessaires à la question partent vers le fournisseur d'IA ; avec votre propre Claude, elles vont directement chez Anthropic.
- Rien n'est écrit sans validation ; tout s'annule.

Détails dans [docs/security.md](docs/security.md).

## Compatibilité

- PrestaShop 1.6, 1.7, 8 et 9
- macOS 11+ et Windows 10+
- Claude Desktop, Claude Code, Cursor, Codex et tout client MCP

## Liens

- Site : https://oneshopmanager.com/
- Brancher Claude à PrestaShop : https://oneshopmanager.com/claude-prestashop
- Assistant IA et MCP : https://oneshopmanager.com/fonctionnalites/assistant-ia-mcp-prestashop
- Vidéo : https://oneshopmanager.com/promo.mp4
- Tarif : https://oneshopmanager.com/tarif
- Contact : contact@oneshopmanager.com

## Licence

La documentation de ce dépôt est sous licence [CC BY 4.0](LICENSE). One Shop Manager est un logiciel commercial.
