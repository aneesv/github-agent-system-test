# Changelog

## 1.0.0 (2026-03-05)


### Features

* active phase labels + stacked plan PRs ([8d04e39](https://github.com/aneesv/github-agent-system-test/commit/8d04e39b0ea5263757f80a27b5be572da42e2320))
* Add a hello-world CLI script with a configurable greeting ([27c9a5b](https://github.com/aneesv/github-agent-system-test/commit/27c9a5bce20e359308500d17c048d904dd845de9))
* Add math utility module with add, subtract, multiply, divide ([f9d43bc](https://github.com/aneesv/github-agent-system-test/commit/f9d43bc69cf00f54f8cec41d9ce862c5920f8294))
* add multi-agent automation system ([1c3f1e5](https://github.com/aneesv/github-agent-system-test/commit/1c3f1e535f402b330842b151b5731e11a7e1bac6))
* **cli:** add hello-world script ([a1932d6](https://github.com/aneesv/github-agent-system-test/commit/a1932d632a3138b4c77094cc48e2d50ee3f82461))
* **math:** add math module with add/subtract/multiply/divide ([530815b](https://github.com/aneesv/github-agent-system-test/commit/530815bbbaf8638717b6af9f611ecc3eac416011))
* **pipeline:** add QA agent + expand review criteria ([356d1db](https://github.com/aneesv/github-agent-system-test/commit/356d1db19076dbdbd8bdab8c73fec0ed00e7289f))
* **research:** web search + library version discovery ([7f7aa23](https://github.com/aneesv/github-agent-system-test/commit/7f7aa237c248398b75e4cf5ef5417c4f5fa48ec8))
* use native sub-issues API for querying and UI ([ace26bd](https://github.com/aneesv/github-agent-system-test/commit/ace26bd173b616597f847bbc2fd075a98bcee351))
* **website:** add anti-FOUC script and theme toggle logic ([#19](https://github.com/aneesv/github-agent-system-test/issues/19)) ([91b3fff](https://github.com/aneesv/github-agent-system-test/commit/91b3ffffd25b9901c572d978a194824854e2d276))
* **website:** add CSS custom properties for light and dark theme ([#17](https://github.com/aneesv/github-agent-system-test/issues/17)) ([e4ea37f](https://github.com/aneesv/github-agent-system-test/commit/e4ea37f73301e7d29679633535d925165e37feae))
* **website:** add Header component with theme toggle button ([#18](https://github.com/aneesv/github-agent-system-test/issues/18)) ([305c027](https://github.com/aneesv/github-agent-system-test/commit/305c027940bd2c5a1171a5bf9d1c00f4c7ea024b))
* **website:** scaffold Astro + Cloudflare Workers site ([#7](https://github.com/aneesv/github-agent-system-test/issues/7)) ([7b23956](https://github.com/aneesv/github-agent-system-test/commit/7b239565b3fc2684e1a28c39820d91b468bfa657))


### Bug Fixes

* add allowed_bots to all downstream agent workflows ([9108df7](https://github.com/aneesv/github-agent-system-test/commit/9108df79e3a1452366c650299c5d7b1bd0cab6b6))
* correct claude_args syntax and add safety features ([9aedb6a](https://github.com/aneesv/github-agent-system-test/commit/9aedb6a3afb7e39168a86c05b444a1d95a513dd3))
* **dev-agent:** remove track_progress — not supported for workflow_dispatch ([c83e6a0](https://github.com/aneesv/github-agent-system-test/commit/c83e6a04a2c1d5648b51f4e2d67d3e69b34796dc))
* pipeline review — 11 bugs fixed across all agents ([6d4d30d](https://github.com/aneesv/github-agent-system-test/commit/6d4d30d8733a54b5e9528b0f878c780c026ac9c8))
* **pipeline:** dispatch QA agent via workflow_run ([4a3aa10](https://github.com/aneesv/github-agent-system-test/commit/4a3aa10dfe414c243077f2e17ede825a7c9f43b1))
* **pipeline:** plan PR merge closes parent issue + PM cleans labels ([47c42fc](https://github.com/aneesv/github-agent-system-test/commit/47c42fc13527b63be7267645b32edbf0060c341f))
* **planner,pm:** enforce larger phase chunks, reject over-splitting ([247bd94](https://github.com/aneesv/github-agent-system-test/commit/247bd949a1899ef41ba9ca5648954e587d47b634))
* **pm-release:** increase max-turns from 15 to 25 ([796cd03](https://github.com/aneesv/github-agent-system-test/commit/796cd033be8e443e81f22593be0199f70fbad688))
* **qa:** remove track_progress (unsupported for workflow_dispatch) ([b0be3b2](https://github.com/aneesv/github-agent-system-test/commit/b0be3b2b23991e356570052c8421b7103221a80e))
* **release-gate:** add checkout step for gh CLI context ([49cdbb9](https://github.com/aneesv/github-agent-system-test/commit/49cdbb93ed0dc9d5ae6ea6546fa80e661d5d9b6b))
* **research:** attach plan sub-issue natively after creating it ([6960f41](https://github.com/aneesv/github-agent-system-test/commit/6960f41100b8c8689b3807b1f4eb2e38b41a48f3))
* resolve trigger loops, scheduler subshell bug, dev git config ([4b9678f](https://github.com/aneesv/github-agent-system-test/commit/4b9678f7899279b6f0634c0a7d23f4268bdf33b8))
* restore scheduler checkout and scope review agent to agent PRs only ([61f221c](https://github.com/aneesv/github-agent-system-test/commit/61f221c2a7070ce3d06d00eb77c27cc105245539))
* **scheduler,dev-agent:** use workflow_dispatch to trigger dev-agent from scheduler ([5d2b259](https://github.com/aneesv/github-agent-system-test/commit/5d2b2597d00e0d28a593e08479178fd02468fa30))
* **scheduler:** handle missing native parent API gracefully ([e208956](https://github.com/aneesv/github-agent-system-test/commit/e20895677f189e9302632d57294d6fbd2e6d9b6d))
* **scheduler:** use .labels[] not .labels[].name since labels are pre-transformed to strings ([a0424fe](https://github.com/aneesv/github-agent-system-test/commit/a0424fe59c34e1df40d550db90335270bf139456))
* **workflows:** remove track_progress from background agents to eliminate empty stub comments ([4496add](https://github.com/aneesv/github-agent-system-test/commit/4496addd3d3d70d31aa7f3996c99e3dc83515c15))
* **workflows:** restore track_progress: true on all background agents ([986471b](https://github.com/aneesv/github-agent-system-test/commit/986471beb9dae7a4b7d1ed31ca58bd9e16a8790d))


### Documentation

* update README and CLAUDE.md to reflect current system ([f7c8bf1](https://github.com/aneesv/github-agent-system-test/commit/f7c8bf1e382e7fde5f097398da5748e4a409f4bb))
