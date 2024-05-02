namespace EasePickerDemo.Client;

/// <summary>
///    Enables month and year dropdowns in the calendar.
/// </summary>
public record Dropdown
{
    public int? MinYear { get; set; }
    public int? MaxYear { get; set; }
    public bool? Months { get; set; }
    public bool? Years { get; set; }
    public bool? YearsAscending { get; set; }
}
