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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            $table->string('first_name', 45);
            $table->string('last_name', 45);
            $table->string('email', 45);
            $table->string('phone', 45);
            $table->string('address', 255);
            $table->string('address2', 255)->nullable();
            $table->string('city', 45);
            $table->string('state', 45);
            $table->string('zipcode', 45);
            $table->string('country_code', 45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
