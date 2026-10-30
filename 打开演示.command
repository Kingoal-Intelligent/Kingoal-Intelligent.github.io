#!/bin/bash
# 双击此文件启动演示。关掉弹出的终端窗口，演示即停止。
set -euo pipefail
export PATH="/opt/homebrew/bin:/usr/local/bin:${PATH:-}"
export LANG="${LANG:-zh_CN.UTF-8}"

cd "$(cd "$(dirname "$0")" && pwd)"
URL="http://127.0.0.1:5173/"

if ! command -v npm >/dev/null 2>&1; then
  echo "找不到 npm。请先确认已安装 Node.js。"
  read -r -p "按回车关闭…" _
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "正在安装依赖，第一次会稍久…"
  npm install
fi

if curl -sf -o /dev/null --max-time 2 "$URL"; then
  open "$URL"
  echo "演示已经在运行，已在浏览器中打开。"
  echo "要停止演示，请关掉先前那个正在运行的窗口。"
  exit 0
fi

echo "正在启动演示…"
npm run dev -- --host 127.0.0.1 --port 5173 &
pid=$!

kill_tree() {
  local child
  for child in $(pgrep -P "$1" || true); do
    kill_tree "$child"
  done
  kill "$1" 2>/dev/null || true
}

cleanup() {
  if [ -n "${pid:-}" ] && kill -0 "$pid" 2>/dev/null; then
    kill_tree "$pid"
    wait "$pid" 2>/dev/null || true
  fi
  pid=""
}
trap cleanup EXIT HUP INT TERM

for _ in $(seq 1 60); do
  if curl -sf -o /dev/null --max-time 1 "$URL"; then
    open "$URL"
    echo
    echo "演示已打开： $URL"
    echo "关掉这个窗口，演示就停止。"
    wait "$pid"
    exit 0
  fi
  if ! kill -0 "$pid" 2>/dev/null; then
    echo "启动失败。请看上面的报错。"
    wait "$pid" 2>/dev/null || true
    pid=""
    exit 1
  fi
  sleep 0.5
done

echo "等待超时，演示没有打开。"
exit 1
