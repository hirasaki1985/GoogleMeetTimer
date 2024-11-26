# ずんだもんサーバー

## 起動
```
$ docker run --rm -v ./presets.yaml:/opt/voicevox_engine/presets.yaml \
     -p '127.0.0.1:50021:50021' \
     -e VV_PRESET_FILE:/opt/voicevox_engine/presets.yaml \
     voicevox/voicevox_engine:cpu-ubuntu20.04-latest
```
or
```
$ docker compose up -d
```
