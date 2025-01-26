<?php

namespace App\Enums;

use App\Traits\EnumValues;

enum Categories: string
{
    use EnumValues;

    case AUDIO = 'Audio';
    case WEARABLES = 'Wearables';
    case CAMERAS = 'Cameras';
    case ACCESSORIES = 'Accessories';
    case SMART_PHONES = 'Smart Phones';
    case COMPUTERS = 'Computers';
}
