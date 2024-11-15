using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        string baseUrl = "http://localhost:3000/api";

        using HttpClient client = new HttpClient();

        try
        {
            var timesOfDay = await FetchTimesOfDay(client, baseUrl);
            var languages = await FetchLanguages(client, baseUrl);

            Console.WriteLine("Please select a time of day:");
            for (int i = 0; i < timesOfDay.Length; i++)
            {
                Console.WriteLine($"{i + 1}. {timesOfDay[i]}");
            }
            int timeOfDaySelection = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Please select a language:");
            for (int i = 0; i < languages.Length; i++)
            {
                Console.WriteLine($"{i + 1}. {languages[i]}");
            }
            int languageSelection = Convert.ToInt32(Console.ReadLine());

            string selectedTimeOfDay = timesOfDay[timeOfDaySelection - 1];
            string selectedLanguage = languages[languageSelection - 1];

            string tone = Console.ReadLine() ?? "Formal";


            var greeting = await FetchGreeting(client, baseUrl, selectedTimeOfDay, selectedLanguage, tone);

            Console.WriteLine($"\n{greeting}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    static async Task<string[]> FetchTimesOfDay(HttpClient client, string baseUrl)
    {
        var response = await client.GetAsync($"{baseUrl}/timesOfDay");
        response.EnsureSuccessStatusCode();

        string responseBody = await response.Content.ReadAsStringAsync();



        return JsonSerializer.Deserialize<string[]>(responseBody) ?? Array.Empty<string>();
    }

    static async Task<string[]> FetchLanguages(HttpClient client, string baseUrl)
    {
        var response = await client.GetAsync($"{baseUrl}/languages");
        response.EnsureSuccessStatusCode();

        string responseBody = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<string[]>(responseBody) ?? Array.Empty<string>();
    }

    static async Task<string> FetchGreeting(HttpClient client, string baseUrl, string _timeOfDay, string _language, string _tone)
    {
        // Create the GreetingRequest object
        var requestData = new
        {
            timeOfDay = _timeOfDay,
            language = _language,
            tone = _tone
        };



        // Convert the request to JSON
        string jsonRequest = JsonSerializer.Serialize(requestData);
        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

        Console.WriteLine($"\n{jsonRequest}");

        // Send the POST request
        var response = await client.PostAsync($"{baseUrl}/greet", content);
        response.EnsureSuccessStatusCode();

        // Get the response content as a string
        string responseBody = await response.Content.ReadAsStringAsync();

        // Deserialize the response (assuming it's a JSON object with a 'message' field)
        var responseObject = JsonSerializer.Deserialize<GreetingResponse>(responseBody);
        return responseObject?.Message ?? "No greeting available";
    }
}

public class GreetingResponse
{
    [JsonPropertyName("greetingMessage")]
    public required string Message { get; set; }
}
