#!/usr/bin/env bash
# Launch the 5-agent Vinea website build in a tmux session.
# Run from WSL Ubuntu:  bash scripts/start-agents.sh
set -e

PROJECT="/mnt/c/Users/20252433/Desktop/website_vinea"
PROMPTS="$PROJECT/scripts/agent-prompts"
ENVFILE="$HOME/.vinea_env.sh"
SESSION="vinea"

# Build the shell command for a pane: load node/claude, cd, launch claude with the agent prompt.
launch() {
  local promptfile="$1"
  echo "source '$ENVFILE'; cd '$PROJECT'; claude \"\$(cat '$promptfile')\""
}

tmux has-session -t "$SESSION" 2>/dev/null && { echo "Session '$SESSION' already exists. Attach with: tmux attach -t $SESSION"; exit 0; }

# Pane 0: Orchestrator
tmux new-session -d -s "$SESSION" -n build
tmux send-keys -t "$SESSION":0.0 "$(launch "$PROMPTS/0-orchestrator.md")" C-m

# Panes 1-4
tmux split-window -t "$SESSION":0 -h
tmux send-keys -t "$SESSION":0.1 "$(launch "$PROMPTS/1-vault-researcher.md")" C-m

tmux split-window -t "$SESSION":0 -v
tmux send-keys -t "$SESSION":0.2 "$(launch "$PROMPTS/2-design-system.md")" C-m

tmux select-pane -t "$SESSION":0.0
tmux split-window -t "$SESSION":0 -v
tmux send-keys -t "$SESSION":0.3 "$(launch "$PROMPTS/3-animation.md")" C-m

tmux split-window -t "$SESSION":0 -v
tmux send-keys -t "$SESSION":0.4 "$(launch "$PROMPTS/4-sections.md")" C-m

tmux select-layout -t "$SESSION":0 tiled
tmux select-pane -t "$SESSION":0.0
tmux attach -t "$SESSION"
