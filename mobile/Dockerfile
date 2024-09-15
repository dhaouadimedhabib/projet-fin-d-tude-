# Étape 1 : Construction de l'application Flutter
FROM cirrusci/flutter:stable as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le projet Flutter dans le conteneur
COPY mobile/ .

# Télécharger les dépendances Flutter
RUN flutter pub get

# Construire l'application Flutter pour le web
RUN flutter build web

# Étape 2 : Serveur Nginx pour héberger l'application Flutter Web
FROM nginx:alpine

# Copier les fichiers de l'application Flutter Web construite à partir de l'étape 1
COPY --from=build /app/build/web /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application Flutter
EXPOSE 80

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
