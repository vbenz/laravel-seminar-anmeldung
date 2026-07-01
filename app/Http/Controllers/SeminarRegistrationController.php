<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSeminarRegistrationRequest;
use App\Models\SeminarRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SeminarRegistrationController extends Controller
{
    /**
     * Shows seminar registration form.
     */
    public function index(): Response
    {
        $seminars = DB::table('seminar')
            ->select('id', 'name', 'price')
            ->orderBy('name')
            ->get();

        return Inertia::render('seminar-registration', [
            'seminars' => $seminars,
        ]);
    }

    /**
     * Saves new seminar registration to database.
     * Validates through StoreSeminarRegistrationRequest.
     */
    public function store(StoreSeminarRegistrationRequest $request): RedirectResponse
    {
        try {
            // Retrieve the validated input data
            $validated = $request->validated();

            // Save the valid, clean request
            SeminarRegistration::create($validated);

            // Get seminar
            $seminar = DB::table('seminar')->find($validated['seminar_fk']);
            $seminarName = $seminar?->name ?? 'gewähltes Seminar';
            $fullName = trim(sprintf('%s %s %s', $validated['title'], $validated['first_name'], $validated['last_name']));

            $message = sprintf(
                'Vielen Dank, %s — Ihre Anmeldung für %s wurde erhalten.',
                htmlspecialchars($fullName, ENT_QUOTES, 'UTF-8'),
                htmlspecialchars($seminarName, ENT_QUOTES, 'UTF-8')
            );

            return redirect()->back()->with('success', $message);
        } catch (\Throwable $e) {
            report($e);

            return redirect()->back()
                ->withErrors(['general' => 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'])
                ->withInput();
        }
    }
}
