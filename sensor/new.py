# Importing Libraries 
import serial 
import time 
import random
import socket
import select
arduino = serial.Serial(port='COM8', baudrate=115200, timeout=.1) 

# text_receive_client.py



HOST = '10.20.16.193'
PORT = 3000

ACK_TEXT = 'text_received'

taux='0'

def main():
    # instantiate a socket object
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print('socket instantiated')

    # connect the socket
    connectionSuccessful = False
    while not connectionSuccessful:
        try:
            sock.connect((HOST, PORT))    # Note: if execution gets here before the server starts up, this line will cause an error, hence the try-except
            print('socket connected')
            connectionSuccessful = True
        except:
            pass
        # end try
    # end while

    socks = [sock]
    while True:
        readySocks, _, _ = select.select(socks, [], [], 5)
        for sock in readySocks:
            message = receiveTextViaSocket(sock)
            print(message)
            write_read(int(message))
            
        # end for
    # end while
# end function

def write_read(x): 
    arduino.write([x]) 
    time.sleep(0.05) 
    

def receiveTextViaSocket(sock):
    # get the text via the scoket
    encodedMessage = sock.recv(1024)

    # if we didn't get anything, log an error and bail
    if not encodedMessage:
        print('error: encodedMessage was received as None')
        return None
    # end if

    # decode the received text message
    message = encodedMessage.decode('utf-8')

    # now time to send the acknowledgement
    # encode the acknowledgement text
    encodedAckText = bytes(ACK_TEXT, 'utf-8')
    # send the encoded acknowledgement text
    sock.sendall(encodedAckText)

    return message
# end function

if __name__ == '__main__':
    main()


