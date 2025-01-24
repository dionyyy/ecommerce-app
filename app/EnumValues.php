<?php

namespace App\Traits;

use Exception;
use Illuminate\Support\Collection;

trait EnumValues
{
    /**
     * Undocumented function
     */
    public static function findOrFail(string $value): self
    {
        $enum = self::find($value);

        throw_if(is_null($enum), Exception::class, "{$value} does not exists in " . get_class());

        return $enum;
    }

    /**
     * Undocumented function
     */
    public static function find(string $value): ?self
    {
        $values = self::cases();

        $index = collect($values)->search(fn(self $enum) => $enum->value === $value, $strict = true);

        return $index !== false ? $values[$index] : null;
    }

    /**
     * Undocumented function
     */
    public static function values(): Collection
    {
        return collect(array_column(self::cases(), 'value'));
    }

    /**
     * Undocumented function
     *
     * @param  mixed  $enum
     */
    public function is(mixed $enums): bool
    {
        if (is_array($enums)) {
            return in_array($this, $enums);
        } else {
            return $enums === $this;
        }
    }

    /**
     * Undocumented function
     */
    public function contains(mixed ...$enums): bool
    {
        return collect($enums)->containsStrict($this);
    }

    /**
     * Undocumented function
     */
    public function isEqual(self $value): bool
    {
        return $this->value === $value;
    }

    public static function of(string $value = null, bool $quiet = false): self|null
    {
        if (is_null($value)) {
            return null;
        }

        return $quiet ? self::tryFrom($value) : self::from($value);
    }
}
