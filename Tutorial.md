# Stadium Converting Tutorial (PES6 to FIFAM)

This tutorial will try to explain how to convert a stadium from PES6.

## Before reading

You can use direct download links to download required tools. You don't need to click inline links, as most of them forward to detailed descriptions. Also please read the FAQ section too.

## Required tools

**Blender 2.9+** 

The program we will use to edit stadiums. https://www.blender.org/download/ 

**Adobe Photoshop**

This is used for editing images. If you could find latest version of Photoshop, that's great. I use Photoshop 2020, latest version would be appreciated. For Photoshop, there's a trial 7-day version but also you can find a free CS2 version (it's old but still functional) on the internet.

https://www.adobe.com/uk/products/photoshop/free-trial-download.html 

**Latest OTools version**

OTools is a tool developed by Dmitri for importing/exporting EA Sports model format. **O** is a file extension in EA Sports games which is used for model and animation files.

https://bitbucket.org/fifam/otools/downloads/

**PES6 to FIFA Manager converter**

This tool is developed by Dmitri. It converts the PES6 stadia to .gltf files.

https://www.mediafire.com/file/wgbvkwnv8khedmb/pes6_to_fifam.7z/file

## File convention for stadiums

There are 21 files that are related to a stadium. 

| Files      | Description |
| :---        |    :----   |
| collision_0.bin, collision_1.bin, collision_3.bin      | Collision is used to define how ball will interact with stadium geometry.       |
| complete.txt | This has no meaning. It is a placeholder file by me to periodically batch upload stadiums. |
| covmap_1.fsh   | Covmap file is used to define the shadows reflecting over the players        |
| effects_0.txt, effects_3.txt      | Effect files are used to determine the brightness and color of lights.       |
| lights_0.loc, lights_3.loc   | Determines light locations and rotations.        |
| shadow_0.o, shadow_1.o, shadow_3.o      | Shadow model used on the field. This needs to be separate from stadium model       |
| sky_0.o, sky_1.o, sky_3.o   | Sky model        |
| stadium_0.o, stadium_1.o, stadium_3.o      | Stadium model       |
| template.xml | This XML file manages preview settings for stadiums to be presented in menus. |
| texture_0.fsh, texture_1.fsh, texture_3.fsh   | Every texture used for the stadium is packed in this file including shadow and sky        |

The suffix of files which are 0, 1, 3 are representing the weather condition. FIFAM supports 3 different weather conditions in 3D mode; ***rainy*** (0), ***day*** (1) and ***night*** (3). Rainy and day weather is used in weekend games depending on the weather, while night state is used in weekday games whether it's raining/snowing or not. Collision, light, shadow, sky, stadium and texture files are separately built for each weather.

## FAQ

- The pitch looks weird as it changes color all the time. Why does that happen?
    - This is called [z-fighting](https://en.wikipedia.org/wiki/Z-fighting). Z-fighting is a phenomenon in rendering that occurs when two or more meshes have very similar distances to the camera. To avoid z-fighting, either elevate the pitch by at least 1 meters, or use `-translate 0,0,1.25` while importing the stadium to .o file.
- The shadow looks terrible on the field. Why does that happen?
    - The rendering order of FIFA is messy. To avoid the weird view of shadow, you need to separate the part that needs to overlap the field and export to .gltf file as *shadow_\*.gltf*, then import with OTools. You can use the same settings with importing stadiums.
- Do you plan to create tutorials for stadiums made for other PES or FIFA games?
    - They are complex compared to PES6's models, so for now, no.