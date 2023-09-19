version: '3'
services:
  myapp:
    image: thomasjoseph1/project:v2  
    ports:
     - 3000:4000
    environment:
      - ACCOUNT_SID= Replace with Twilio_sid
      - AUTH_TOKEN= Replace with Twilio AUTH_TOKEN
      - VERIFY_SID= Replace with Twilio VERIFY_SID
      - USER_EMAIL=abcd@gmail.com
      - PASSWORD=ABCDEFGHIJKLMNOP
      - KEY_ID=rozerpay_key_id
      - KEY_SECRET=Your razorpay key secreat

  you need to add all this credentials in the env.yaml file to run this contarainised project and use the  "docker-compose -f env.yaml up"
  command to start