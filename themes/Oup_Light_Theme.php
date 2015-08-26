<?php namespace IET_OU\Open_Media_Player;

/**
 * Open Media Player Light 2012 theme.
 *
 * This theme extends the Open Media Player base theme and adds the visuals, colours and so on.
 *
 * @license   http://iet-ou.mit-license.org/2011 MIT
 * @copyright Copyright 2012-2015 The Open University.
 * @author Peter Devine/LTS 2012-03-08 (visuals, CSS)
 * @author Nick Freear 2012-03-30 (CSS, PHP)
 */

use \IET_OU\Open_Media_Player\Ouplayer_Base_Theme;

class Oup_Light_Theme extends Ouplayer_Base_Theme
{

    public $display = 'Open Media Player light (2012)';
    public $rgb  = self::DEFAULT_RGB;
    public $background = 'black';

    const DEFAULT_RGB = 'ouvle-default-blue';

    public function __construct()
    {
        parent::__construct();

        // Add the light theme top-level styles to the array.
        $this->styles[] = "themes/$this->name/css/oup-light.css";

        $this->css_min = "themes/$this->name/build/oup-light-ouplayer-mediaelement.min.css";


        // Feature: currently we don't support 'High-definition'.
        $this->features = str_replace(',oup_quality', '', $this->features);

        // Experimental feature: add in tooltips on keyboard focus.
        $this->features .= ',oup_tooltip';

        // Experimental feature: HTML5 postMessage.
        if ($this->get_param('postmessage')) {
            $this->features .= ',oup_postmessage';
        }
    }


    /** Prepare: initialize features of the theme, given a player object.
    */
    public function prepare(& $player)
    {
        parent::prepare($player);

        // Embed or Popup mode.
        $mode = get_class($this->CI);

        // The foreground colour name, from configuration or a URL parameter.
        $config_rgb = $this->config_item('player_default_theme_rgb', self::DEFAULT_RGB);
        $this->rgb = $this->get_param('rgb', $config_rgb);

        $this->rgb = str_replace('omp-', 'ouvle-', $this->rgb);

        // Bug #1324, https://gist.github.com/2291035 --? /(ouvle-[a-z]+|button-normal)/
        $RE = 'default-blue|orange|dark-blue|green|grey|purple|pink|dark-red'; #'|button-normal'
        if (! preg_match("/^ouvle-($RE)\$/", $this->rgb)) {
          #$this->CI->_error("(theme error) unrecognized value for 'rgb' parameter: ".$this->rgb, 400);
            $this->_debug("Warning (theme), unrecognized value for 'rgb' color parameter, ". $this->rgb);
            $this->rgb = self::DEFAULT_RGB;
        }


        // Bug #1377, Experimental: custom/ transparent player background color.
        $bg = $this->get_param('background');
        $bg_options = explode('|', 'transparent|black|white|beige');
        if ('Embed' == $mode && $bg && in_array($bg, $bg_options)) {
            $this->background = $bg;
        }

        // Specific override for embedded VLE audio player.
        if ($player->is_player('vle')
        && 'audio' == $player->media_type
        && 'Embed' == $mode) {
            $this->background = 'transparent';
        }
    }
}
