# Sanar Intern Challenge Mobile

<div align="center">
  <img src="https://media.giphy.com/media/lODEHyfhLDzVcocD33/giphy.gif" alt="Login Flow Gif" />
  <img src="https://media.giphy.com/media/ybRlHMwOZE5BbUsvCb/giphy.gif" alt="Article Gif"/>
</div>

<br>
<div align="center">
  This application is my solution of <strong>Sanar Intern Challenge Mobile</strong>
</div>
<br>

## ⚔️ The challenge

Develop an app that let users read articles related to healthcare, using React Native.
<br>

What was requested:

- Developing three mandatory screens: Onboard, Login and Register, as close as possible to the [prototype](https://www.figma.com/file/U67le6ZsSSb0XOgU4F7COC/Est%C3%A1gio-%2F-2022.1?node-id=2%3A274)
- Get the articles from [HealthCare API](https://www.healthcare.gov/api/articles.json)
- Developing user login workflow, using functions from the loginAPI file. It is important to note that there is no back-end service and AsyncStorage was used to store the data locally.
- Use validation rules in the input fields

You can check out the full description of this challenge at [this repository](https://github.com/jacksonsmith/react_native_challenge_intern_mobile).

## 🚀 Additional functionalities

Apart from the previously said functionalities, I also added some new things:

- Search articles by language
- Search articles by text
- User logout
- Password visiblity button on inputs

## 📚 Libraries

I chose to try not using a bunch of libraries, making it a simple as possible. Here are the ones I used in the project:

- Axios → for the http requests.
- React Navigation V6 → to configure navigation between screens.
- React Hook Form / Yup → to create and validate forms.
- React Native Render HTML → as the name says, it was used to render html strings that came from the API. I chose using this library instead of React Native WebView so as to get a cleaner code, without those ugly JavaScript injections.

## 🏃 Running the application

### Clone the repository

```
git clone https://github.com/grazieleoliveira/react_native_challenge_intern_mobile.git
```

### Install the dependencies

```
 yarn install
```

### Start Metro and run your Android emulator

```
npx react-native start
npx react-native run-android
```
