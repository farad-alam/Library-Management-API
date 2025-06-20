import app from "./app";

const PORT = 3000 

async function main() {
    try {
        app.listen(PORT, () => {
          console.log(`App is listingin on port ${PORT}`);
        });
    } catch (error) {
        
         const resObj = {
          message: "Server listning failed",
          success: false,
          error : error,
        };
        console.log(`Here is the server error`,resObj);

        
    }
}

main()
