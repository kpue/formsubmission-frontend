# formsubmission-frontend
A simple form made with React
## Requirements

+ Must have [Node.js](https://nodejs.org/) installed
+ API that handles the following requests
    + GET
    ```
    {
        "occupations": [
            "occupation1",
            "occupation2",
            ...
        ],
        "states": [
            {
                "name": "Alabama",
                "abbreviation": "AL"
            },
            ...
        ]
    }
    ```
    + POST
        + Accepts request with JSON body of below format and responds with status 200
        ```
            {
            "name": "???",
            "email": "???",
            "password": "???",
            "occupation": "???",
            "state": "???"
            }
         ```


## How to test
```
git clone https://github.com/kpue/formsubmission-frontend.git
cd formsubmission-frontend
npm install
npm run dev
```
