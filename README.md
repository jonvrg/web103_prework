# WEB103 Prework - Dance Creatorverse

Submitted by: **Jonathan Vergonio**

About this web app: **Provides information about Dance Creators on TikTok. This app connects to a database using Supabase and allows users to add, edit, delete, and view CreatorCards.**

Time spent: **9** hours

## Required Features

The following **required** functionality is completed:

- [X] **A logical component structure in React is used to create the frontend of the app**
- [X] **At least five content creators are displayed on the homepage of the app**
- [X] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [X] **API calls use the async/await design pattern via Axios or fetch()**
- [X] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [X] **Each content creator has their own unique URL**
- [X] **The user can edit a content creator to change their name, url, or description**
- [X] **The user can delete a content creator**
- [X] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [X] Picocss is used to style HTML elements
- [X] The content creator items are displayed in a creative format, like cards instead of a list
- [X] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [X] **Live list refresh** on add/edit/delete without a full page reload (prop `onChanged` to re-fetch).
- [X] **Loading & error states** for all pages (Show, View, Add, Edit).
- [X] **Secure external links** (`target="_blank"` with `rel="noreferrer"`).
- [X] **Responsive grid layout** that adapts card columns per screen size.
- [X] **Reusable `CreatorCard` component** with its own minimal CSS file.

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Walkthrough of Dance Studio Posts App](assets/dancecreatorsvisual.gif)
GIF created with LiceCap

## Notes

Handling API calls with `async/await` taught me more about proper error handling and loading states for a better user experience. 

If there was more time, I would add a scroll left/right feature for a seamless user experience.

Additionally, I would add more eccentric/personalized styling that matches the feel of the dance community.

## License

Copyright [2025] [Jonathan Vergonio]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.