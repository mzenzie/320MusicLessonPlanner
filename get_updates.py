#get_updates.py 
#Put this script on the virtual machine running the website and keep it in a screen in order to allow updates whenever.
#Prior to using it, you must define the commands that it will use to start, end, and update the server.

from twisted.internet import protocol, reactor, endpoints
import subprocess

END_CMD = ["stopapp"] #stopapp is defined as "pkill -f node"
RUN_CMD = ["runapp"] #runapp is defined as "screen -m cd %MLP root directory% && node app"
UPDATE_CMD = ["update"] #update is defined as "screen -m cd %MLP root directory% && git pull"

UPDATE_PORT = 4774 #The port to connect to when you want to update
RUN_PORT = 5885 #The port to connect to when you want to restart the server

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
