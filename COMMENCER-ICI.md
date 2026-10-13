# FortBoost AI — commencer ici

Le dépôt officiel est https://github.com/SculptMethod/fortboost.

## Modifier le site avec ChatGPT
Demandez simplement « Modifie la section … » ou « Améliore la page … ». Le travail doit être fait directement dans ce dépôt, sur une branche dédiée, puis proposé en pull request. Aucun téléchargement manuel de fichiers inchangés n'est nécessaire.

## État du produit
Le site présente une application Windows **en développement**. La démonstration dans le navigateur utilise exclusivement des exemples. Aucun paiement réel, téléchargement d'installateur ni gain de performances n'est garanti.

## Vérifications
Exécuter `npm install`, `npm run check`, `npm run syntax` et `npm test`. Les tests d'intégration Stripe et Supabase demandent des comptes de test configurés.

## Publication
Relier le dépôt GitHub à Netlify et configurer les variables décrites dans `docs/deployment.md`. Vérifier une prévisualisation avant de fusionner la branche. Ne jamais publier de secrets.

## Pour le logiciel Windows
Lire `docs/windows-integration.md` et `docs/API.md`. La sécurité et la compatibilité anti-triche doivent être validées avant lancement.
