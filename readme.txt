     <% allMatches.forEach( (singleMatch) => { %>
            <%= singleMatch.PARAMETER %> <br>
            <div class="medium-content-container-column palette-c" style="font-size: 1em;">
                <h2>Need or Offering (Example)</h2>
                <div class="container-row-no-wrap">
                    <div class="search-result-row-label">
                        <span>Neighbor's Name:</span>
                    </div>   
                    <div class="search-result-row-result">
                        <span> <%= singleMatch.formFirstName %> </span>
                        <br><br>
                    </div>
                </div>
            </div>
        <% }) %> 