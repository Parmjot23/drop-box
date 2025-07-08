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

## Configuration
- Change mount point by editing `.env` (`DJANGO_MEDIA_ROOT`).
- Change host IP via `NEXT_PUBLIC_API_URL` in `.env`.
- Backup: `rsync -av /mnt/localbox /path/to/backup/drive`.

## Drive Check
`tools/check_drive.sh` ensures `/mnt/localbox` is writable before Django starts.
