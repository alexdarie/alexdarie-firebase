# alexdarie-firebase
Personal website https://alexdarie.me built with Ionic, hosted on Firebase and accessible through Namecheap.

On the master:
![Firebase console, hosting dashboard][page_demo]

Redesigned version:
![Firebase console, hosting dashboard][page_demo_redesign]

### Download and Setup

```
git clone <>
npm install --save-dev @angular-devkit/build-angular
```

### Build Ionic for Browser

```
ionic build --prod --release
firebase deploy
```

### Custom domain setup

Open the Firebase console > Hosting, then select "Add custom domain"

![Firebase console, hosting dashboard][step_one]

type your domain, copy the TXT Record you'll receive in the second panel, then open the Namecheap console.

![Namecheap console, main dashboard][step_two]

Select "Manage", then

![Namecheap console, advanced dns dashboard][step_three]

go to "Advanced DNS" and

![Namecheap console, records dashboard][step_four]

add the TXT Record. There are two additional A records which can be faound in the "Advanced" settings panel on Firebase Hosting.

[step_one]: https://github.com/alexdarie/alexdarie-firebase/blob/master/readme-files/Screen%20Shot%202020-07-12%20at%201.21.33%20PM.png "Firebase console, hosting dashboard"

[step_two]: https://github.com/alexdarie/alexdarie-firebase/blob/master/readme-files/Screen%20Shot%202020-07-12%20at%201.22.17%20PM.png "Namecheap console, main dashboard"

[step_three]: https://github.com/alexdarie/alexdarie-firebase/blob/master/readme-files/Screen%20Shot%202020-07-12%20at%201.22.36%20PM.png "Namecheap console, advanced dns dashboard"

[step_four]: https://github.com/alexdarie/alexdarie-firebase/blob/master/readme-files/Screen%20Shot%202020-07-12%20at%201.22.53%20PM.png "Namecheap console, records dashboard"

[page_demo]: https://github.com/alexdarie/alexdarie-firebase/blob/master/readme-files/Screen%20Shot%202020-07-29%20at%204.23.34%20PM.png "Page demo"

[page_demo_redesign]: https://github.com/alexdarie/alexdarie-firebase/blob/master/readme-files/Screen%20Shot%202020-08-04%20at%209.39.10%20PM.png "Page demo redesign"

### Versions

`v1.0` Marks the version with a home page (without menu), 2/3 column-switch in the grid and a footer.
