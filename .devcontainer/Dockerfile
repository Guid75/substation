FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install the xz-utils package
RUN apt-get update && apt-get install -y libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
  
RUN curl -fsSL https://bun.sh/install | bash
RUN curl -y --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
