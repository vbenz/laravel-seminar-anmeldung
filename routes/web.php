<?php

use App\Http\Controllers\SeminarRegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SeminarRegistrationController::class, 'index'])->name('seminar.registration');
Route::post('/seminar-registration', [SeminarRegistrationController::class, 'store'])->name('seminar.registration.store');
