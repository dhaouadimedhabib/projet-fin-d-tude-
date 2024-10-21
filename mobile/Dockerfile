# Étape 1 : Image de base légère avec Flutter
FROM debian:bullseye-slim AS build

# Installer les dépendances requises
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    unzip \
    xz-utils \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Télécharger Flutter SDK
WORKDIR /opt
RUN git clone https://github.com/flutter/flutter.git -b stable --depth 1

# Ajouter Flutter au PATH
ENV PATH="/opt/flutter/bin:/opt/flutter/bin/cache/dart-sdk/bin:${PATH}"

# Désactiver l'avertissement Flutter pour root
ENV FLUTTER_SUPPRESS_ANALYTICS=true

# Spécifier des miroirs pour éviter les problèmes de connectivité
ENV PUB_HOSTED_URL=https://pub.flutter-io.cn
ENV FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

# Vérifier l'installation de Flutter
RUN flutter doctor

# Configurer le répertoire de travail et copier les sources Flutter
WORKDIR /app
COPY . .

# Nettoyer l'environnement avant de télécharger les dépendances
RUN flutter clean

# Télécharger les dépendances Flutter
RUN flutter pub get --verbose

# Construire l'application Flutter pour le web
RUN flutter build web

# Étape 2 : Serveur Nginx pour héberger l'application Flutter Web
FROM nginx:alpine

# Copier les fichiers de l'application Flutter Web construite à partir de l'étape 1
COPY --from=build /app/build/web /usr/share/nginx/html

# Exposer le port 80 pour accéder à l'application Flutter
EXPOSE 8089

# Démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
