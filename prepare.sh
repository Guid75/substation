#!/bin/bash

sudo apt update
sudo apt install -y libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
curl -fsSL https://bun.sh/install | bash
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
