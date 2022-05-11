export class User{

    userName : string;
    userPassword : string;
    groupId : number;
    token : string;
}
export class NewUser{
    firstName : any;
    lastName : any;
    userName : any;
    userPassword : any;
    gender : CharacterData;
    email : any;
    phoneNumber : any;
    birthDate : any;
}

export class Status{

    fullName : string;
    isValid : boolean;
    token : string;
    roles : string[];
}

export class StatusChecking{
    
    status : string;
}