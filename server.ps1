# Local Web Server for Al-Sakhra Educational Center
param(
    [int]$Port = 3000
)

$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }

try {
    $listener.Start()
    Write-Output "Server running at $prefix"
    Write-Output "Serving files from $baseDir"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        try {
            $rawPath = [System.Uri]::UnescapeDataString($req.Url.LocalPath)
            if ($rawPath -eq "/" -or [string]::IsNullOrWhiteSpace($rawPath)) {
                $rawPath = "/index.html"
            }

            $relative = $rawPath.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            $localPath = Join-Path $baseDir $relative

            # Fallback to index.html for SPA if not found
            if (-not (Test-Path $localPath -PathType Leaf)) {
                $indexPath = Join-Path $baseDir "index.html"
                if (Test-Path $indexPath -PathType Leaf) {
                    $localPath = $indexPath
                }
            }

            if (Test-Path $localPath -PathType Leaf) {
                $contentBytes = [System.IO.File]::ReadAllBytes($localPath)
                $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                $contentType = "application/octet-stream"

                if ($ext -eq ".html" -or $ext -eq ".htm") { $contentType = "text/html; charset=utf-8" }
                elseif ($ext -eq ".js") { $contentType = "application/javascript; charset=utf-8" }
                elseif ($ext -eq ".jsx") { $contentType = "text/babel; charset=utf-8" }
                elseif ($ext -eq ".css") { $contentType = "text/css; charset=utf-8" }
                elseif ($ext -eq ".json") { $contentType = "application/json; charset=utf-8" }
                elseif ($ext -eq ".svg") { $contentType = "image/svg+xml" }
                elseif ($ext -eq ".jpg" -or $ext -eq ".jpeg") { $contentType = "image/jpeg" }
                elseif ($ext -eq ".png") { $contentType = "image/png" }
                elseif ($ext -eq ".ico") { $contentType = "image/x-icon" }
                elseif ($ext -eq ".webp") { $contentType = "image/webp" }
                elseif ($ext -eq ".woff2") { $contentType = "font/woff2" }

                $res.ContentType = $contentType
                $res.ContentLength64 = $contentBytes.Length
                $res.StatusCode = 200
                $res.AddHeader("Access-Control-Allow-Origin", "*")

                if ($req.HttpMethod -ne "HEAD") {
                    $res.OutputStream.Write($contentBytes, 0, $contentBytes.Length)
                }
            } else {
                $res.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $res.ContentType = "text/plain; charset=utf-8"
                $res.ContentLength64 = $msg.Length
                if ($req.HttpMethod -ne "HEAD") {
                    $res.OutputStream.Write($msg, 0, $msg.Length)
                }
            }
        } catch {
            Write-Host "Request error: $_"
        } finally {
            try { $res.Close() } catch {}
        }
    }
} catch {
    Write-Output "Server error: $_"
} finally {
    if ($listener.IsListening) { $listener.Stop() }
    $listener.Close()
}
