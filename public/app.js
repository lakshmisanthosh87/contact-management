async function addContact() {

    
    try {

        const response =await fetch("http://localhost:3000/api/contact",{
            method:"POST",
            headers:{
                "content-type":"application/json",
                
            },
            body:{
                name:
            }
        })

    } catch (error) {
        console.log("error occured while creating a contact", error)
    }
}