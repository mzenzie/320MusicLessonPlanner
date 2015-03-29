#get_updates.py 
#Put this script on the virtual machine running the website and keep it in a screen in order to allow updates whenever

from twisted.internet import protocol, reactor, endpoints
import subprocess

END_CMD = ["pkill","-f","node"]
RUN_CMD = ["runapp"]
UPDATE_CMD = ["update"]

UPDATE_PORT = 4774
RUN_PORT = 5885

class Update(protocol.Protocol):
    def connectionMade(self):
        subprocess.Popen(UPDATE_CMD)

class UpdateFactory(protocol.Factory):
    def buildProtocol(self, addr):
        return Update()

class Run(protocol.Protocol):
    def connectionMade(self):
        subprocess.Popen(END_CMD)
        subprocess.Popen(RUN_CMD)

class RunFactory(protocol.Protocol):
    def buildProtocol(self, addr):
        return Run()

endpoints.serverFromString(reactor, "tcp:"+str(UPDATE_PORT)).listen(UpdateFactory())
endpoints.serverFromString(reactor, "tcp:"+str(RUN_PORT)).listen(RunFactory())
reactor.run()
