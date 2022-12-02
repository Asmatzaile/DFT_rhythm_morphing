# DFT-powered rhythm morphing
A Max/MSP patch for making rhythmic sequences that are produced via interpolation of the Fourier coefficients of two adjustable rhythms. The produced sequences can also be played with a canon-like offset.


## Project motivation
The interest for building this project was born in the classroom of the subject *Teoria musical del segle XX* (20th Century Musical Theory) at [ESMUC](https://www.esmuc.cat/en/) (the Catalonia College of Music) in Barcelona with the professor [Thomas Noll](https://www.researchgate.net/profile/Thomas-Noll-3). Following Noll's lectures, I wondered whether it would be rhythmically interesting to morph between two rhythms via their spectral components, taking up the challenge of programming everything in the Max environment.


## Project description
The presentation view of the patch is divided in four areas:
 - **Word generation** (top left)  
   The first area's purpose is to define the words by which the source rhythms will be derived. One can use well-formed word generators (via the a|b seed and the *gamma* and *delta* operators) or manually enter the word, by clicking buttons or by typing. One can also rotate the word to produce modes or copy the word from one of the source rhythms. There are buttons to send the current words to one of the rhythm.  
   *Note: once you start manually entering the word, the* gamma *and* delta *operators will become disabled. To enable them again, the word must be reset to 'a b' via the reset button.*
 - **Source rhythm settings** (bottom left)  
   This area serves for setting the source rhythm's component's length. The word's 'a' and 'b' letters will be transformed into notes with the specified respective durations. For example, the word 'aabaaab' with durations a: 2 and b: 1 will be transformed in the rhythm '2212221'.  
   These rhythms are interpreted as signals (in our previous example, '101011010101') which are subject to a [Discrete Fourier Transform](https://en.wikipedia.org/wiki/Discrete_Fourier_transform). There are two visualizations for the resulting coefficients: one for the moduli and the phases and another for a 2-dimensional plot.  
   *Note: the length of both rhythms must be the same; otherwise, an error message will appear covering the next two areas.*
 - **Fourier interpolation** (top right)  
   In this area, one can interpolate between the fourier coefficients of the two rhythms. This interpolation can be done from the general multislider, to affect both voices, or from dedicated multisliders to affect each voice individually.  
   There are two visualizations of the fourier coefficients for each voice, as in the previous area for the source rhythms.
 - **Rhythm playback** (bottom right)  
   In the final area, there are some controls to play the interpolated voices back, whose content becomes MIDI messages that are sent to the computer's MIDI synthesizer.


## Code structure
 - **code:** Contains custom-made js code.
 - **patchers:** Contains custom-made patcher objects.
 - **thirdparty:** Contains the third party [complex.js](https://github.com/infusion/Complex.js) library.
 - **DFT_rhythm_morphing.maxproj:** The file you have to open in order to load the patch.  
 *Note: although not strictly necessary for the patch to work, the Bach library is required to visualize the score of the two source rhythms.*
 
 
## Screenshots
Patch in presentation mode:
![Patch in presentation mode](/screenshots/patch_presentation_mode.png)

Patch in edit mode:
![Patch in patching mode](/screenshots/patch_patching_mode.png)