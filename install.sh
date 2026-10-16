#!/usr/bin/env bash
# Cài bộ skill vào một dự án (.claude/skills) hoặc cho mọi dự án trên máy (~/.claude/skills).
#
#   ./install.sh <thư-mục-dự-án>   cài cho một dự án
#   ./install.sh --global          cài cho mọi dự án của người dùng hiện tại
#   thêm --force                   ghi đè skill cùng tên đã có
set -euo pipefail

SOURCE="$(cd "$(dirname "$0")" && pwd)/plugins/tvs-ui-skills/skills"
TARGET=""
FORCE=0

for arg in "$@"; do
  case "$arg" in
    --global) TARGET="$HOME/.claude/skills" ;;
    --force) FORCE=1 ;;
    -h|--help) sed -n '2,7p' "$0"; exit 0 ;;
    *) TARGET="$(cd "$arg" && pwd)/.claude/skills" ;;
  esac
done

if [ -z "$TARGET" ]; then
  echo "Thiếu đích cài. Dùng: ./install.sh <thư-mục-dự-án> hoặc ./install.sh --global" >&2
  exit 1
fi

mkdir -p "$TARGET"
for skill in "$SOURCE"/*/; do
  name="$(basename "$skill")"
  if [ -e "$TARGET/$name" ] && [ "$FORCE" -ne 1 ]; then
    echo "Bỏ qua $name: đã có ở $TARGET/$name (thêm --force để ghi đè)"
    continue
  fi
  rm -rf "${TARGET:?}/$name"
  cp -R "$skill" "$TARGET/$name"
  echo "Đã cài $name -> $TARGET/$name"
done

echo "Xong. Mở một phiên Claude Code mới để skill có hiệu lực."
