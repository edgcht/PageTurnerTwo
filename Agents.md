# agents.md

## Présentation du projet

**PageTurner** est une plateforme collaborative de rédaction de livres, développée avec React, TypeScript, Vite, Tailwind CSS et Supabase. Elle permet aux utilisateurs d’écrire, publier, commenter, aimer, rejoindre des groupes, participer à des challenges et suivre leur progression.

---

## Structure du projet

- **Frontend** : React + TypeScript, Tailwind CSS, Lucide React pour les icônes.
- **Backend** : Supabase (PostgreSQL, Auth, Storage).
- **Gestion d’état** : Hooks personnalisés (`useAuth`, `useBooks`, `useCommunity`, `useSocial`).
- **Pages principales** :
  - Accueil (`HomePage`)
  - Découverte de livres (`DiscoveryPage`)
  - Lecture d’un livre (`BookPage`)
  - Rédaction (`WritingPage`)
  - Profil utilisateur (`ProfilePage`)
  - Communauté (`CommunityPage`)
- **Composants clés** :
  - Navigation (`Navigation`)
  - Modale d’authentification (`AuthModal`)
  - Éditeur de texte riche (`RichTextEditor`)
  - Liste des chapitres (`ChapterList`)
- **Contexts** :
  - Authentification (`AuthContext`)
  - Thème (`ThemeContext`)

---

## Technologies et dépendances

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icônes)
- Supabase JS SDK
- ESLint (typescript-eslint, react-hooks, react-refresh)
- React Query (optionnel, non utilisé dans les hooks fournis)

---

## Modèle de données principal (Supabase)

- **profiles** : Utilisateurs, stats, préférences, avatar, etc.
- **books** : Livres, auteur, synopsis, genre, tags, stats, visibilité.
- **chapters** : Chapitres, contenu, numéro, stats, statut.
- **likes** : Likes sur livres, chapitres, commentaires.
- **comments** : Commentaires sur chapitres.
- **groups** : Groupes communautaires.
- **challenges** : Défis d’écriture.
- **badges** : Succès et récompenses.
- **follows** : Relations de suivi entre utilisateurs.

---

## Authentification

- Utilise Supabase Auth.
- Hooks et contextes pour la gestion de session, inscription, connexion, déconnexion, mise à jour du profil.
- Création automatique du profil lors de l’inscription.

---

## Fonctionnalités principales

- **Écriture collaborative** : Création et édition de livres et chapitres.
- **Découverte** : Recherche et filtrage de livres publiés.
- **Commentaires et likes** : Interaction sociale sur les chapitres et livres.
- **Groupes et challenges** : Communauté, défis, progression.
- **Profil utilisateur** : Statistiques, badges, livres récents.
- **Thème clair/sombre** : Context `ThemeContext`.

---

## Points d’intégration

- **Supabase** : Toutes les opérations CRUD passent par le client Supabase typé avec le schéma `Database`.
- **Hooks personnalisés** : Pour chaque entité (livres, chapitres, groupes, challenges, likes, commentaires).
- **Contextes React** : Pour l’authentification et le thème.
- **UI** : Tailwind CSS pour le style, Lucide React pour les icônes.

---

## Fichiers importants

- [src/App.tsx](src/App.tsx) : Point d’entrée de l’application React.
- [src/main.tsx](src/main.tsx) : Bootstrap React.
- [src/lib/supabase.ts](src/lib/supabase.ts) : Initialisation du client Supabase et helpers d’auth.
- [src/lib/database.types.ts](src/lib/database.types.ts) : Typage du schéma Supabase.
- [src/hooks/useAuth.ts](src/hooks/useAuth.ts) : Hook d’authentification.
- [src/hooks/useBooks.ts](src/hooks/useBooks.ts) : Hook pour livres et chapitres.
- [src/hooks/useCommunity.ts](src/hooks/useCommunity.ts) : Hook pour groupes et challenges.
- [src/hooks/useSocial.ts](src/hooks/useSocial.ts) : Hook pour likes et commentaires.
- [src/contexts/AuthContext.tsx](src/contexts/AuthContext.tsx) : Context d’authentification.
- [src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx) : Context du thème.
- [src/components/Navigation.tsx](src/components/Navigation.tsx) : Barre de navigation.
- [src/components/AuthModal.tsx](src/components/AuthModal.tsx) : Modale d’authentification.
- [src/components/RichTextEditor.tsx](src/components/RichTextEditor.tsx) : Éditeur de texte riche.

---

## Démarrage

- Variables d’environnement à définir dans `.env` :
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Scripts :
  - `npm run dev` : Démarrer le serveur de développement.
  - `npm run build` : Build de production.
  - `npm run lint` : Linter le code.

---

## Sécurité

- Row Level Security activé sur toutes les tables Supabase.
- Politiques d’accès pour chaque table (voir [supabase/migrations/20250714145624_navy_lagoon.sql](supabase/migrations/20250714145624_navy_lagoon.sql)).

---

## Style et UI

- Utilisation exclusive de Tailwind CSS pour le style.
- Icônes Lucide React pour tous les éléments graphiques.
- Design moderne, responsive, adapté pour la production.

---

## Pour aller plus loin

- Ajouter des tests unitaires.
- Intégrer la gestion des notifications en temps réel.
- Ajouter la gestion des fichiers (images de couverture, avatars) via Supabase Storage.
