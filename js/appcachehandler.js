// Appcache buster

if (window.applicationCache) {
    applicationCache.addEventListener('updateready', function() {
        if (confirm('An update is available. Reload now?')) {
            window.location.reload();
        }
    });
}