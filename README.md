# LocalBox

Self-hosted Dropbox-style app for LAN file sharing.

Features include a mobile‑first interface with drag‑and‑drop uploads. Multiple
files can be uploaded at once and each upload shows a progress bar. When an
upload finishes the browser will display a notification if permissions allow.

## Quick Start
```bash
git clone <repo>
cd drop-box
cp .env.example .env
docker compose run web python manage.py migrate
docker compose up --build
```
Open `http://<HOST_IP>:3000` in your browser.

When accessing from other devices on your LAN, set `NEXT_PUBLIC_API_URL` in
`.env` to `http://<HOST_IP>:8000` so media links resolve correctly.

## Configuration
- Change mount point by editing `.env` (`DJANGO_MEDIA_ROOT`).
- Change host IP via `NEXT_PUBLIC_API_URL` in `.env` (use `http://web:8000` when running in Docker).
- Ensure port `8000` is exposed in `docker-compose.yml` for media URLs.
- Backup: `rsync -av $DJANGO_MEDIA_ROOT /path/to/backup/drive`.

## Drive Check
`tools/check_drive.sh` ensures the directory defined by `DJANGO_MEDIA_ROOT` (defaults to `./media`) is writable before Django starts.
