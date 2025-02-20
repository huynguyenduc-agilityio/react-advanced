# REACT ADVANCED PRACTICE

## Overview

- This document provides requirements and estimation for React Advanced Practice.
- Plan: [Link](https://docs.google.com/document/d/1hys8JcOsG7pdDh5pyQB0PnajVLfvQbPx_1T9qOfaBCI/edit?usp=sharing)

## Targets

- Apply knowledge of React Advanced.
- Building UI with Chakra UI
- Use Storybook for documenting React components.
- Understand how to create code structures and configure included technologies with React.
- Improve and develop techniques that have yet to be mastered such as unit testing (coverage greater than 90%).
- Apply new tech stacks Zustand for state management locally.
- Optimizing Performance

## Technical

- Vite
- Prettier
- ESLint
- React
- TypeScript
- Storybook
- Jest
- React Query
- Zustand
- React-Testing-Library
- Chakra UI

## Timeline

- Timeline:
  - Estimate: 12 days
  - Calendar:
    - Start: 2025/01/22
    - End: 2025/02/13

## Requirements

- Follow this [design](https://www.figma.com/design/GpIJyixhchvGv6rSUXuSH8/Dash-Dark-X?node-id=0-1&p=f&t=TLZn4PyeqsB8w4ti-0) and implement the features below:

### BUSINESS LOGIC

#### User List Page

- Display all users including pagination (selectable quantity of rows shown on each page)
- The admin can add new products by clicking the “Add User” button.
- The admin can search users by user name (does not include insensitive cases).
- The admin can delete the user by clicking on the trash icon on each table row.
- The admin can delete multiple users after selecting the checkboxes on each row from the table.

#### Add user Page

- The admin has to fill in the personal and basic information on the “Personal Information” tab.
- The admin has to fill in the team information on the “Team” tab.
- The admin has to fill in the billing address and select the payment methods on the “Billing” tab.
- The admin has to select the options in the “General notifications” and “Summary notifications” sections on the “Notifications” tab
- The admin can submit a new user by the “Add User” button on the Notifications tab.

#### Edit user Page

- The user information will be populated on each tab and edited eventually through the “Save” button on the Notifications Tab.

### UNIT TESTING

- Unit test coverage is required over 90%.

### PAGE SPEED

- Checking the website page speed through the [page speed insight](https://pagespeed.web.dev/).

### CROSS BROWSERS

- The site should function smoothly across the - specified browser versions without any UI breaks.
- Chrome (126.0+)
- Firefox (128.0+)
- Microsoft Edge on Windows 10 (126.0+)

### DEPLOYMENT

- [Reference link](https://vercel.com/)

## Getting started

- Step 1: Clone repository.
  - With HTTPS:
    - `$ git clone https://gitlab.asoft-python.com/huy.nguyenduc/react-trainning.git`.
  - With SSH:
    - `$ git clone git@gitlab.asoft-python.com:huy.nguyenduc/react-trainning.git`.
- Step 2: Move to the folder which is just cloned on your computer.
  - `cd ./react-training`.
- Step 3: Change a branch to `develop`
  - `git checkout develop`.
- Step 4: Move to the folder advanced-practice.
  - `cd ./advanced-practice`.
- Step 5:
  - Open terminal > `pnpm i`.
  - Run `pnpm run dev` to start application.
- Step 6:
  - Run Storybook: `pnpm run storybook`.
  - Run Test: `pnpm run test`

## Author

- Huy Nguyen.
- Email: [huy.nguyenduc@asnet.com.vn](huy.nguyenduc@asnet.com.vn).
