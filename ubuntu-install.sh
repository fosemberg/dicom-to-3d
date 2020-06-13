# main
sudo apt update
sudo apt upgrade
sudo apt install git
# nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
# reload to console

# nodejs
nvm install node
npm i -g yarn
npm i -g pm2

# python
sudo apt install python3-pip

# clone project
mkdir git
cd git
git clone https://github.com/fosemberg/dicom-to-3d.git

# run serer front
cd ~/git/dicom-to-3d/server/front
yarn
pm2 start npm -- start

# run server back
cd ~/git/dicom-to-3d/server/back
yarn
pm2 start npm -- run dev

# python deps
pip3 install SimpleITK
pip3 install vtk
pip3 install numpy

sudo apt install python-qt4 libgl1-mesa-glx
sudo apt-get install xvfb
