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











        <% searchMatchArray.forEach ((singleMatchedUser) => { %>
            
                <div class="medium-content-container-column palette-c" style="font-size: 1em;">
                    
                    <h2> <%= offer %> </h2>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <span>Neighbor's Name:</span>
                        </div>   
                        <div class="search-result-row-result">
                            <span> <%= singleMatchedUser.publicDisplayName %> </span>
                            <br><br>
                        </div>
                    </div>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <span>Neighborhood:</span>
                        </div>   
                        <div class="search-result-row-result">
                            <span> <%= singleMatchedUser.formNeighborhood %> </span>
                            <br><br>
                        </div>
                    </div>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <span>More Information from Neighbor:</span>
                        </div>   
                        <div class="search-result-row-result">
                            
                            <!-- need to do some Looping here to get the correct explainOffer -->
                            <span> <%= singleMatchedUser.explainOfferCooking %> </span>
                            <br><br>
                        </div>
                    </div>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <span>Contact Information:</span>
                        </div>   
                        <div class="search-result-row-result">
                            <span> <%= singleMatchedUser.publicDisplayContact %> </span><br>
                            
                            <br><br>
                        </div>
                    </div>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <span>Community Update:</span>
                        </div>   
                        <div class="search-result-row-result">
                            <span> <%= singleMatchedUser.communityUpdateOfferCooking %> </span>
                            <br><br>
                        </div>
                    </div>
                    <form action="/addCommunityNotes" method="PUT">
                        <fieldset>
                            <div class="container-row-no-wrap">
                                <div class="search-result-row-label">
                                    <legend>Update this need or offering:</legend>
                                    <label for="communityNotes">Examples: Explain how this need was met and on what date or explain how this offering was accessed and on what date.</label>
                                </div>   
                                <div class="search-result-row-result">
                                    <textarea class="search-result-textarea" placeholder="Explain here" id="communityNotes" name="communityNotes"> <%= singleMatchedUser.communityUpdateOfferCooking %> </textarea>
                                    <br><br>
                                    <input type="submit" class="button palette-a">
                                    <br>
                                </div>
                            </div>
                        </fieldset>  
                    </form>  
                </div>  
                
                
                <% }) %></div>




























                <% let explainOffer = ''; %>
                <% let communityUpdate = '' %>
                <% if (offer = 'Offer: Childcare') { %>
                    <% explainOffer = singleMatchedUser.explainOfferChildcare; %>  
                    <% communityUpdate = singleMatchedUser.communityUpdateOfferChildcare %> 
                <% } else if (offer = 'Offer: Cooking') { %>
                    <% explainOffer = singleMatchedUser.explainOfferCooking; %>  
                    <% communityUpdate = singleMatchedUser.communityUpdateOfferCooking %> 
                <% } else if (offer = 'Offer: Food and Supplies') { %>
                    <% explainOffer = singleMatchedUser.explainOfferFoodAndSupplies; %>  
                    <% communityUpdate = singleMatchedUser.communityUpdateOfferFoodAndSupplies %>
                    <div class="medium-content-container-column palette-c" style="font-size: 1em;">
                        
                        <h2> <%= offer %> </h2>
                        <div class="container-row-no-wrap">
                            <div class="search-result-row-label">
                                <span>Neighbor's Name:</span>
                            </div>   
                            <div class="search-result-row-result">
                                <span> <%= singleMatchedUser.publicDisplayName %> </span>
                                <br><br>
                            </div>
                        </div>
                        <div class="container-row-no-wrap">
                            <div class="search-result-row-label">
                                <span>Neighborhood:</span>
                            </div>   
                            <div class="search-result-row-result">
                                <span> <%= singleMatchedUser.formNeighborhood %> </span>
                                <br><br>
                            </div>
                        </div>
                        <div class="container-row-no-wrap">
                            <div class="search-result-row-label">
                                <span>More Information from Neighbor:</span>
                            </div>   
                            <div class="search-result-row-result">
                                
                                <!-- need to do some Looping here to get the correct explainOffer -->
                                <span> <%= explainOffer %> </span>
                                <br><br>
                            </div>
                        </div>
                        <div class="container-row-no-wrap">
                            <div class="search-result-row-label">
                                <span>Contact Information:</span>
                            </div>   
                            <div class="search-result-row-result">
                                <span> <%= singleMatchedUser.publicDisplayContact %> </span><br>
                                
                                <br><br>
                            </div>
                        </div>
                        <div class="container-row-no-wrap">
                            <div class="search-result-row-label">
                                <span>Community Update:</span>
                            </div>   
                            <div class="search-result-row-result">
                                <span> <%= communityUpdate %> </span>
                                <br><br>
                            </div>
                        </div>
                        <form action="/addCommunityNotes" method="PUT">
                            <fieldset>
                                <div class="container-row-no-wrap">
                                    <div class="search-result-row-label">
                                        <legend>Update this need or offering:</legend>
                                        <label for="communityNotes">Examples: Explain how this need was met and on what date or explain how this offering was accessed and on what date.</label>
                                    </div>   
                                    <div class="search-result-row-result">
                                        <textarea class="search-result-textarea" placeholder="Explain here" id="communityNotes" name="communityNotes"> <%= communityUpdate %> </textarea>
                                        <br><br>
                                        <input type="submit" class="button palette-a">
                                        <br>
                                    </div>
                                </div>
                            </fieldset>  
                        </form>  
                    </div>  
















        <!-- <div class="medium-content-container-column palette-c" style="font-size: 1em;">
            <h2>Need or Offering (Example)</h2>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Neighbor's Name:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>Neighbor 4</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Category:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>childcare</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Neighborhood:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>Codman</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>More Information from Neighbor:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>I am looking for childcare outside of my home on the days my partner and I both work (usually only 1-2 afternoons per week). We have an outgoing 2-year-old who plays well with children. Please send references if you respond to this request.</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Frequency:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>weekly, varying schedule</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Contact Information:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>thisperson@email.com</span><br>
                    <span>(720) 894-2076</span><br>
                    <span>Street Name</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Community Update:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>This is where information that is updated on the form below gets put. </span>
                    <br><br>
                </div>
            </div>
            <form action="/addCommunityNotes" method="POST">
                <fieldset>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <legend>Update this need or offering:</legend>
                            <label for="communityNotes">Examples: Explain how this need was met and on what date or explain how this offering was accessed and on what date.</label>
                        </div>   
                        <div class="search-result-row-result">
                            <textarea class="search-result-textarea" placeholder="Explain here" id="communityNotes" name="communityNotes"></textarea>
                            <br><br>
                            <input type="submit" class="button palette-a">
                            <br>
                        </div>
                    </div>
                </fieldset>  
            </form>
        </div> -->

       
        
        

        <!-- <div class="medium-content-container-column palette-c" style="font-size: 1em;">
            <h2>Need or Offering (Example)</h2>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Neighbor's Name:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>Neighbor 4</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Category:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>childcare</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Neighborhood:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>Codman</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>More Information from Neighbor:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>I am looking for childcare outside of my home on the days my partner and I both work (usually only 1-2 afternoons per week). We have an outgoing 2-year-old who plays well with children. Please send references if you respond to this request.</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Frequency:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>weekly, varying schedule</span>
                    <br><br>
                </div>
            </div>
            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Contact Information:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>thisperson@email.com</span><br>
                    <span>(720) 894-2076</span><br>
                    <span>Street Name</span>
                    <br><br>
                </div>
            </div>


            <div class="container-row-no-wrap">
                <div class="search-result-row-label">
                    <span>Community Update:</span>
                </div>   
                <div class="search-result-row-result">
                    <span>This is where information that is updated on the form below gets put. </span>
                    <br><br>
                </div>
            </div>
            <form action="/addCommunityNotes" method="POST">
                <fieldset>
                    <div class="container-row-no-wrap">
                        <div class="search-result-row-label">
                            <legend>Update this need or offering:</legend>
                            <label for="communityNotes">Examples: Explain how this need was met and on what date or explain how this offering was accessed and on what date.</label>
                        </div>   
                        <div class="search-result-row-result">
                            <textarea class="search-result-textarea" placeholder="Explain here" id="communityNotes" name="communityNotes"></textarea>
                            <br><br>
                            <input type="submit" class="button palette-a">
                            <br>
                        </div>
                    </div>
                </fieldset>  
            </form>
        </div> -->