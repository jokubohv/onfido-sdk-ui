{
    "tests": [
      {
        "file": "test/specs/happy.js",
        "timeout": 120000,
        "browsers": [
          {
            "browserName": "chrome",
            "remote": false
          }
        ]
      },
      {
        "file": "test/specs/IE11.js",
        "timeout": 120000,
        "browsers": [
          {
            "browserName": "IE",
            "browser_version": "11.0",
            "os": "Windows",
            "os_version": "10",
            "resolution": "1920x1080",
            "remote": true
          }
        ]
      }
    ]
  }
  