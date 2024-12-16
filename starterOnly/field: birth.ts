field: birth,
    birthDateEmpty : any = false,
        birthDateAfter : any = false,
            condition: () => {
                const today = new Date();
                const birthDate = new Date(birth.value);

                //return birth.value !== "" && birthDate <= today;
                if (birthDate == '') {
                    birthDateEmpty = true;
                }
                if (birthDate > today) {
                    birthDateAfter = true;
                }

            },
      if (birthDateEmpty) {
    errorMessage: "Veuillez entrer une date de naissance";
},
if (birthDateAfter) {
    errorMessage: "Veuiilez entrer une date antérieure"
}