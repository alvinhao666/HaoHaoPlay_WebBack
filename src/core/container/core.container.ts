
export abstract class CoreContainer {


    firstName = '';

    firstNameBgColor = '';

    constructor() {

    }

    setFirstName(firstName: string) {
        localStorage.setItem('H_FirstName', firstName);
        this.firstName = firstName;
    }

    setFirstNameBgColor(firstNameBgColor: string) {
        localStorage.setItem('H_FirstNameBgColor', firstNameBgColor);
        this.firstNameBgColor = firstNameBgColor;
    }
}