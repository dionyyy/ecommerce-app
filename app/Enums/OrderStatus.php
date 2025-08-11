<?php

namespace App\Enums;

use App\Traits\EnumValues;

enum OrderStatus: string
{
    use EnumValues;

    case PENDING = 'pending';
    case COMPLETE = 'complete';
    case CANCEL = 'cancel';
}
