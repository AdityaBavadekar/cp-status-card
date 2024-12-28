# CP Status Card
_A Status card for competitive programming profiles._

## API Endpoints

### Codeforces Profile

To generate a Codeforces status card for a user, use the following endpoint:

```
https://cp-status-card.vercel.app/api/cf/[USERNAME]
```

```markdown
![CodeForces Status Card](https://cp-status-card.vercel.app/api/cf/USERNAME)
```

**Example:**

![Codeforces Status](https://cp-status-card.vercel.app/api/cf/tourist)


### LeetCode Profile

To generate a LeetCode status card for a user, use the following endpoint:

```
https://cp-status-card.vercel.app/api/leetcode/[USERNAME]
```

```markdown
![Leetcode Status Card](https://cp-status-card.vercel.app/api/leetcode/USERNAME)
```

**Example:**

![LeetCode Status](https://cp-status-card.vercel.app/api/leetcode/neal_wu)


<!-- ### Other Platforms -->

## How to Use
1. Replace the USERNAME in the URL with your USERNAME from the respective platform (Codeforces or LeetCode).
2. Copy the URL and paste it into your GitHub README.
3. The status card will be automatically displayed.


## Installation (for local use)

1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaBavadekar/cp-status-card
   ```
2. Navigate into the directory:
   ```bash
   cd cp-status-card
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the server:
   ```bash
   npm run dev
   ```

The local server will be runnning at `http://localhost:5080`.


## License
```

   Copyright 2024 Aditya Bavadekar

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

```