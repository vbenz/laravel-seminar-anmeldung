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
        Schema::create('seminar_registration', function (Blueprint $table) {
            $table->id();
            $table->string('title', 16);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('mail');
            $table->foreignId('seminar_fk')->constrained('seminar')->cascadeOnDelete();
            $table->integer('participant_count');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seminar_registration');
    }
};
