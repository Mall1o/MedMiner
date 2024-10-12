from app import create_app

app = create_app()

if __name__ == '__main__':
    #context = ('cert.pem', 'key_no_pass.pem')
    #app.run(ssl_context=context, debug=True,port=443, host='0.0.0.0')
    app.run(debug=True,port=5000)