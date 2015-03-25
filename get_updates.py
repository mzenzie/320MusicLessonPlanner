#get_updates.py 
#Put this script on the virtual machine running the website and keep it in a screen in order to allow updates whenever

from twisted.internet import protocol, reactor, endpoints
import subprocess

received = []

PORT = 4774

class Update(protocol.Protocol):
    def dataReceived(self,data):
        global received
        received.append(data)
        if("u" in data):
            received = []
            subprocess.Popen(["git","pull"], shell=True)

class UpdateFactory(protocol.Factory):
    def buildProtocol(self, addr):
        return Update()

endpoints.serverFromString(reactor, "tcp:"+str(PORT)).listen(UpdateFactory())
reactor.run()
