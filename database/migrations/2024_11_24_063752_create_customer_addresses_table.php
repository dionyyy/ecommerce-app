<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('type', 45)->nullable(); // e.g., 'billing' or 'shipping'
            $table->string('address', 255);
            $table->string('address2', 255)->nullable();
            $table->string('city', 45);
            $table->string('state', 45);
            $table->string('zipcode', 45);
            $table->foreignId('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->string('country_code', 45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_addresses');
    }
};
