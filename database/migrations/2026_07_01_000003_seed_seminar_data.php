<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('seminar')->insert([
            [
                'name' => 'Zahnmedizin für Einsteiger',
                'price' => 149.00,
            ],
            [
                'name' => 'Moderne Kronen- und Brückenversorgung',
                'price' => 219.00,
            ],
            [
                'name' => 'Prävention im Zahnarztalltag',
                'price' => 129.00,
            ],
            [
                'name' => 'Parodontitis früh erkennen',
                'price' => 189.00,
            ],
            [
                'name' => 'Digitale Zahnmedizin im Praxisalltag',
                'price' => 259.00,
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('seminar')->whereIn('name', [
            'Zahnmedizin für Einsteiger',
            'Moderne Kronen- und Brückenversorgung',
            'Prävention im Zahnarztalltag',
            'Parodontitis früh erkennen',
            'Digitale Zahnmedizin im Praxisalltag',
        ])->delete();
    }
};
