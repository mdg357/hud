Broad strokes from here: https://die-antwort.eu/techblog/2017-12-setup-raspberry-pi-for-kiosk-mode/

1. Run `raspi-config`
 - Change password
 - Boot option: Desktop / CLI -> Console Autologin
 

2. Get some updates
	`sudo apt-get update`
	`sudo apt-get upgrade`
	
3. Install the minimal x-server and window manager
	`sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox`

4. Install web browser
	`sudo apt-get install --no-install-recommends chromium-browser`

5. Setup openbox
	Place the following into `/etc/xdg/openbox/autostart`
```	
# Disable any form of screen saver / screen blanking / power management
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
chromium-browser --disable-infobars --kiosk 'localhost'
```

6. Edit .profile and append the following line:
	`[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor`
	
7. Install nginx
	`sudo apt-get install nginx`
	
8. Configure nginx to serve up HUD:
	Edit /etc/nginx/sites-enabled/default
	
	Change the root line to read: `root /home/pi/hud`